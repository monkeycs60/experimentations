'use client';

import { useCompletion } from 'ai/react';

export default function Completion() {
	const {
		completion,
		input,
		stop,
		isLoading,
		handleInputChange,
		handleSubmit,
	} = useCompletion({
		api: '/api/gemini',
	});

	return (
		<div className='stretch mx-auto flex w-full max-w-md flex-col py-24'>
			<form onSubmit={handleSubmit}>
				<label>
					Say something...
					<input
						className=' mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl'
						value={input}
						onChange={handleInputChange}
					/>
				</label>
				<output>Completion result: {completion}</output>
				<button type='button' onClick={stop}>
					Stop
				</button>
				<button disabled={isLoading} type='submit'>
					Send
				</button>
			</form>
		</div>
	);
}
