import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const phoneRegex = new RegExp(
	/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

//form1 schema
const formSchema = z.object({
	fName: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lName: z.string().min(2, {
		message: "Last name must be at least 2 characters.",
	}),
	phone: z.string().regex(phoneRegex, 'Invalid phone number!').min(10, {
		message: "Please insert valid phone number."
	}).max(14, {
			message: "Phone numberis too long."
	}),
	street: z.string().min(2, {
		message: "Street must be at least 2 characters.",
	}),
	city: z.string().min(2, {
		message: "City must be at least 2 characters.",
	}),
	state: z.string().min(2, {
		message: "State must be at least 2 characters.",
	}),
});

function doctorProfilePersonalForm() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fName: "",
			lName: "",
			phone: "",
			street: "",
			city: "",
			state: "",
		},
	});

	function onSubmitPersonal(values) {
		// Do something with the form values.
		console.log("")
		console.log(values.fName);
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmitPersonal)}
					class="w-full rounded-lg p-4 border-2 border-gray-200 bg-white shadow-sm col-span-2"
				>
					<div class="flex flex-wrap -mx-3 mb-6">
						<p class="text-gray-600 text-xs italic"></p>
						{/* first name  */}
						<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<FormField
								control={form.control}
								name="fName"
								render={({ field }) => (
									<FormItem>
										<FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
											first name
										</FormLabel>
										<FormControl>
											<Input
												placeholder="John"
												{...field}
												class="appearance-none block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
											/>
										</FormControl>
										<FormMessage class="text-red-500 text-xs italic" />
									</FormItem>
								)}
							/>
						</div>
						{/* last name */}
						<div class="w-full md:w-1/2 px-3">
							<FormField
								control={form.control}
								name="lName"
								render={({ field }) => (
									<FormItem>
										<FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
											Last name
										</FormLabel>
										<FormControl>
											<Input
												placeholder="doel"
												{...field}
												class="appearance-none block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
											/>
										</FormControl>
										<FormMessage class="text-red-500 text-xs italic" />
									</FormItem>
								)}
							/>
						</div>
					</div>
					{/* long input */}
					<div class="flex flex-wrap -mx-3 mb-6">
						{/* phone num */}
						<div class="w-full px-3">
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
											Phone Number
										</FormLabel>
										<FormControl>
											<Input
												placeholder="0xxxxxxxxx"
												{...field}
												class="appearance-none block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
											/>
										</FormControl>
										<FormMessage class="text-red-500 text-xs italic" />
									</FormItem>
								)}
							/>
						</div>
					</div>

					{/* three inputs */}
					<div class="flex flex-wrap -mx-3 mb-2">
						{/* street input */}
						<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
							<FormField
								control={form.control}
								name="street"
								render={({ field }) => (
									<FormItem>
										<FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
											Street
										</FormLabel>
										<FormControl>
											<Input
												placeholder="90210"
												{...field}
												class="appearance-none block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
											/>
										</FormControl>
										<FormMessage class="text-red-500 text-xs italic" />
									</FormItem>
								)}
							/>
						</div>
						{/* city input */}
						<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
							<FormField
								control={form.control}
								name="city"
								render={({ field }) => (
									<FormItem>
										<FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
											City
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Colombo"
												{...field}
												class="appearance-none block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
											/>
										</FormControl>
										<FormMessage class="text-red-500 text-xs italic" />
									</FormItem>
								)}
							/>
						</div>
						{/* <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    State
                  </label>
                  <div class="relative">
                    <select class="block appearance-none w-full bg-neutral-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-teal-400" id="grid-state">
                      <option>New Mexico</option>
                      <option>Missouri</option>
                      <option>Texas</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div> */}
						{/* state input */}
						<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
							<FormField
								control={form.control}
								name="state"
								render={({ field }) => (
									<FormItem>
										<FormLabel class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
											state
										</FormLabel>
										<FormControl>
											<Input
												placeholder="western"
												{...field}
												class="appearance-none block w-full bg-neutral-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-teal-400"
											/>
										</FormControl>
										<FormMessage class="text-red-500 text-xs italic" />
									</FormItem>
								)}
							/>
						</div>
						
					</div>
					<Button type="submit" class="float-end bg-teal-500 rounded-lg p-2 mt-2 font-medium text-white border shadow-md">Update</Button>
				</form>
			</Form>
		</>
	);
}

export default doctorProfilePersonalForm;
