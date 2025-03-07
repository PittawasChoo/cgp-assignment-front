import * as Yup from "yup";

export const validationSchema = Yup.object({
    community: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    detail: Yup.string().required("Required"),
});
