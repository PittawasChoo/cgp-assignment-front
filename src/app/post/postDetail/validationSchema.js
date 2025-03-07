import * as Yup from "yup";

export const validationSchema = Yup.object({
    detail: Yup.string().required("Required"),
});
