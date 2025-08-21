import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { passwordChangeSchema } from "@/components/schema/profileType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { updateUserPassword } from "@/action/profileHandler";
import toast from "react-hot-toast";

export const PasswordChange = () => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof passwordChangeSchema>>({
        resolver: zodResolver(passwordChangeSchema),
        defaultValues: {
            old_password: '',
            new_password: '',
            new_password_confirm: ''
        }
    })

    const onSubmit = (values: z.infer<typeof passwordChangeSchema>) => {
        startTransition(() => {
            updateUserPassword(values)
                .then((response) => {
                    if (response.status === 400){
                        toast.error(response.message)
                    }
                    if (response.status == 'success'){
                        toast.success("User password updated successfully!")
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
                Update User Password
            </span>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="old_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Old Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder="******"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="new_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder="******"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="new_password_confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password Confirm</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            placeholder="******"
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