// import { Controller, Control, FieldValues, Path } from "react-hook-form";
//
// import {
//     FormItem,
//     FormLabel,
//     FormControl,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
//
// interface FormFieldProps<T extends FieldValues> {
//     control: Control<T>;
//     name: Path<T>;
//     label: string;
//     placeholder?: string;
//     type?: "text" | "email" | "password";
// }
//
// const FormField = <T extends FieldValues>({
//                                               control,
//                                               name,
//                                               label,
//                                               placeholder,
//                                               type = "text",
//                                           }: FormFieldProps<T>) => {
//     return (
//         <Controller
//             control={control}
//             name={name}
//             render={({ field }) => (
//                 <FormItem>
//                     <FormLabel className="label">{label}</FormLabel>
//                     <FormControl>
//                         <Input
//                             className="input"
//                             type={type}
//                             placeholder={placeholder}
//                             {...field}
//                         />
//                     </FormControl>
//                     <FormMessage />
//                 </FormItem>
//             )}
//         />
//     );
// };
//
// export default FormField;


import { Controller, Control, FieldValues, Path } from "react-hook-form";
import {
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: "text" | "email" | "password";
}

const FormField = <T extends FieldValues>({
                                              control,
                                              name,
                                              label,
                                              placeholder,
                                              type = "text",
                                          }: FormFieldProps<T>) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        />
                    </FormControl>
                    <FormMessage className="text-sm text-red-500 mt-1" />
                </FormItem>
            )}
        />
    );
};

export default FormField;
