import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDataProps } from "./Profile";
import { nameUpdateSchema } from "@/components/schema/profileType";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserName } from "@/action/profileHandler";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const Userprofile = ({ userData }: { userData: UserDataProps }) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof nameUpdateSchema>>({
        resolver: zodResolver(nameUpdateSchema),
        defaultValues: {
            email: userData.email,
            name: userData.name,
        }
    })

    const onSubmit = (values: z.infer<typeof nameUpdateSchema>) => {
        startTransition(() => {
            updateUserName({ name: values.name })
                .then((response) => {
                    if (response.status === 400){
                        toast.error(response.error)
                    }
                    if (response.status == 'success'){
                        toast.success("Username updated successfully!")
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        })
    }

    return (
        <div className="p-4">
            <span className="text-center font-bold">
                Update User Name
            </span>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder="abc.xyz@example.com"
                                            type="email" 
                                            readOnly
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                       <FormField 
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder="Abc Xyz"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}