'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { CommandList } from 'cmdk';
import { GeckoCoinID } from '@/types/geckoCoinID';
import { getAllCryptos } from '@/actions/getAllCryptos';
import { getSpecificCrypto } from '@/actions/getSpecificCrypto';
import { GeckoCoinsList } from '@/types/geckoCoinsList';
import { addCryptoToPortfolio } from '@/actions/addCryptoToPortfolio';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { revalidatePath } from 'next/cache';

const API_KEY = process.env.COINGECKO_API_KEY;

const FormSchema = z.object({
	cryptoId: z.string(),
	cryptoName: z.string().min(3, {
		message: 'CryptoSymol must be at least 3 characters.',
	}),
});

export function SpecificCryptoForm() {
	const { data: session } = useSession();
	console.log(session?.user?.id);

	const [open, setOpen] = useState(false);

	const [selectedCrypto, setSelectedCrypto] = useState<GeckoCoinsList | null>(
		null
	);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			cryptoName: '',
			cryptoId: '',
		},
	});

	const { register } = form;
	register('cryptoId');

	const [searchTerm, setSearchTerm] = useState('');

	const {
		data: coinsList,
		isLoading: isCoinsListLoading,
		isError: isCoinsListError,
	} = useQuery<GeckoCoinsList[]>({
		queryKey: ['coinsList'],
		queryFn: async () => {
			const data = await getAllCryptos();
			return data || [];
		},
		staleTime: Infinity,
	});

	const {
		data: specificCrypto,
		isLoading: isSpecificCryptoLoading,
		isError: isSpecificCryptoError,
	} = useQuery<GeckoCoinID>({
		queryKey: ['specificCrypto', selectedCrypto?.id],
		queryFn: async () => {
			const data = await getSpecificCrypto(selectedCrypto?.id as string);
			return data as GeckoCoinID;
		},
		enabled: form.formState.isSubmitted && !form.formState.isSubmitting,
		staleTime: Infinity,
	});
	console.log(specificCrypto);
	console.log(selectedCrypto?.id);
	const watchCryptoId = form.watch('cryptoId');
	console.log(watchCryptoId);

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data);
		try {
			const selectedCrypto = coinsList?.find(
				(crypto) => crypto.name === data.cryptoName
			);
			if (!selectedCrypto) {
				throw new Error('Selected crypto not found');
			}
			setSelectedCrypto(selectedCrypto);
			const fetchedCrypto = await getSpecificCrypto(selectedCrypto.id);
			console.log(fetchedCrypto);

			fetchedCrypto &&
				(await addCryptoToPortfolio(session?.user?.id, fetchedCrypto));
			toast({
				title: 'Fetched selected crypto data',
			});

			console.log('Fetched selected crypto:', fetchedCrypto);

			return fetchedCrypto;
		} catch (error) {
			console.error('Error fetching selected crypto:', error);
			toast({
				title: 'Failed to fetch selected crypto',
				description: 'Please try again later.',
			});
		}
	}

	const MAX_RESULTS = 25;

	const filteredCryptoListings = coinsList
		?.filter((crypto) =>
			crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.slice(0, MAX_RESULTS);

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-2/3 space-y-6'>
					<FormField
						control={form.control}
						name='cryptoName'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>
									Add a crypto to your portfolio{' '}
									<span className='text-red-500'>*</span>
								</FormLabel>
								<Popover open={open} onOpenChange={setOpen}>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant='outline'
												role='combobox'
												className={cn(
													'w-[400px] justify-between',
													!field.value && 'text-muted-foreground'
												)}>
												{field.value
													? filteredCryptoListings?.find(
															(crypto) =>
																crypto.name === field.value
													  )?.name
													: 'Select a crypto'}
												<CaretSortIcon className='ml-2 size-4 shrink-0 opacity-50' />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='max-h-80 w-[400px] overflow-auto p-0'>
										<Command>
											<CommandInput
												placeholder='Search cryptocurrency...'
												className='h-9'
												onValueChange={(value) =>
													setSearchTerm(value)
												}
											/>
											<CommandEmpty>No crypto found</CommandEmpty>
											<CommandList>
												<CommandGroup>
													{filteredCryptoListings?.map(
														(crypto) => (
															<CommandItem
																value={crypto.name}
																key={crypto.id}
																onSelect={() => {
																	form.setValue(
																		'cryptoName',
																		crypto.name
																	);
																	form.setValue(
																		'cryptoId',
																		crypto.id
																	);
																	setOpen(false);
																}}>
																<div className='flex items-center gap-2'>
																	<span className=''>
																		{crypto.name}
																	</span>
																	<span className='text-xs font-bold text-black/70'>
																		(
																		{crypto.symbol.toLocaleUpperCase()}
																		)
																	</span>
																</div>
																<CheckIcon
																	className={cn(
																		'ml-auto h-4 w-4',
																		crypto.name ===
																			field.value
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
															</CommandItem>
														)
													)}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
								<FormDescription>
									Enter the name of a cryptocurrency
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Add to your portfolio</Button>
				</form>
			</Form>
			{specificCrypto && (
				<div>
					<p>{specificCrypto.description.en}</p>
					{/* <p>{specificCrypto.description}</p> */}
					<Image
						src={specificCrypto.image.large}
						width={60}
						height={60}
						alt='crypto logo'
					/>
				</div>
			)}
		</div>
	);
}
