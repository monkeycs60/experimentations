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
import { CryptoDataGecko } from '@prisma/client';

const API_KEY = process.env.CMC_API_KEY;

async function getAllCryptos(): Promise<CryptoDataGecko[] | undefined> {
	try {
		const response = await fetch(
			'https://api.coingecko.com/api/v3/coins/list',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-cg-demo-api-key': API_KEY as string,
				},
				cache: 'no-store',
			}
		);

		if (!response.ok) {
			throw new Error(
				'Failed to fetch data from coingecko in the back end route API'
			);
		}

		const data: CryptoDataGecko[] = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return undefined;
	}
}

const FormSchema = z.object({
	cryptoName: z.string().min(3, {
		message: 'CryptoSymol must be at least 3 characters.',
	}),
});

export function SpecificCryptoForm() {
	const [selectedCrypto, setSelectedCrypto] = useState<CryptoDataGecko | null>(
		null
	);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			cryptoName: '',
		},
	});

	const [searchTerm, setSearchTerm] = useState('');

	const {
		data: coinsList,
		isLoading: isCoinsListLoading,
		isError: isCoinsListError,
	} = useQuery<CryptoDataGecko[]>({
		queryKey: ['coinsList'],
		queryFn: async () => {
			const data = await getAllCryptos();
			return data || [];
		},
		staleTime: Infinity,
	});

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
			toast({
				title: 'Fetched selected crypto data',
			});
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
		<>
			{isCoinsListLoading && <p>Loading...</p>}
			{isCoinsListError && <p>Error fetching crypto listings.</p>}
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
									Crypto Symbol
									<span className='text-red-500'>*</span>
								</FormLabel>
								<Popover>
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
									Enter the symbol of the crypto you want to fetch.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
			{selectedCrypto && (
				<div>
					<h2>{selectedCrypto.name}</h2>
					<p>{selectedCrypto.symbol}</p>
				</div>
			)}
		</>
	);
}
