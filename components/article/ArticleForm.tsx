"use client";

import React, { useState, useActionState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { z } from "zod";
import { formSchema } from "@/lib/validations/article";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions/article";

const ArticleForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
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

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "SUCCESS",
          description: "Your aritcle haa been created successfully",
        });

        router.push(`/article/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check your input and try again",
          variant: "destructive",
        });
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div className="startup-form_space">
        <label htmlFor="title" className="startup-form_lable">
          Title
        </label>
        <Input id="title" name="title" className="startup-form_input" placeholder="Article Title" />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>
      <div className="startup-form_space">
        <label htmlFor="description" className="startup-form_lable">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          placeholder="Article description"
        />
        {errors.description && <p className="startup-form_error">{errors.description}</p>}
      </div>
      <div className="startup-form_space">
        <label htmlFor="category" className="startup-form_lable">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          placeholder="Article category(e.g. Technology, Business, etc.)"
        />
        {errors.category && <p className="startup-form_error">{errors.category}</p>}
      </div>
      <div className="startup-form_space">
        <label htmlFor="link" className="startup-form_lable">
          Image URL
        </label>
        <Input id="link" name="link" className="startup-form_input" placeholder="Article link" />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>
      <div className="startup-form_space" data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_lable">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Briefly describe your latest news here!",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
        {isPending ? "Submitting...." : "Submit your Pitch"}
        <Send className="size-15 ml-4" />
      </Button>
    </form>
  );
};

export default ArticleForm;
