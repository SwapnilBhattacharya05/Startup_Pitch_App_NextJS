"use client";
import {Input} from "@/components/ui/input";
import {useState, useActionState} from "react";
import {Textarea} from "@/components/ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {formSchema} from "@/lib/validation";
import {z} from "zod";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState("");

    const router = useRouter();


    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            };
            await formSchema.parseAsync(formValues); // TAKE THE FORM VALUES AND COMPARE IT WITH FORM-SCHEMA
            console.log(formValues)

            // const result = await createIdea(prevState, formData, pitch)
            // console.log(result)

            // if (result.status === "SUCCESS") {
            //     toast.success("Success", {
            //         description: "Your startup pitch has been created successfully."
            //     });
            //     await router.push(`/startup/${result.id}`)
            // }
            //
            // return result;

        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>)

                toast.error("Error", {
                    description: "Please check your inputs and try again."
                });

                return {
                    ...prevState,
                    error: "Validation failed",
                    status: "ERROR"
                }
            }

            toast.error("Error", {
                description: "An unexpected error has occurred."
            });

            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR"
            }
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit,
        {
            error: "",
            status: "INITIAL"
        });


    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label>
                <Input className="startup-form_input" name="title" id="title" required
                       placeholder="Your Startup Name"/>
                {errors?.title && <p className="startup-form_error">{errors?.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className="startup-form_label">Description</label>
                <Textarea className="startup-form_textarea" name="description" id="description" required
                          placeholder="Short description for your startup idea"/>
                {errors?.description && <p className="startup-form_error">{errors?.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className="startup-form_label">Category</label>
                <Input className="startup-form_input" type="text" name="category" id="category" required
                       placeholder="Choose a category (e.g. Web3, Health, Education, etc.)"/>
                {errors?.category && <p className="startup-form_error">{errors?.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className="startup-form_label">Image Link</label>
                <Input className="startup-form_input" type="text" name="link" id="link" required
                       placeholder="Paste a link to your demo or promotional media"/>
                {errors?.link && <p className="startup-form_error">{errors?.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch" className="startup-form_label">Pitch</label>
                <MDEditor
                    className="startup-form_editor"
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview="edit"
                    style={{
                        borderRadius: 20,
                        overflow: "hidden"
                    }}
                    textareaProps={{
                        placeholder: "Briefly describe your idea and what problem it solves.",
                    }}
                    previewOptions={{
                        disallowedElements: ['style'],
                    }}
                />
                {errors?.pitch && <p className="startup-form_error">{errors?.pitch}</p>}
            </div>
            <Button className="startup-form_btn text-white" type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className="size-6 ml-2"/>
            </Button>

        </form>
    )
}
export default StartupForm
