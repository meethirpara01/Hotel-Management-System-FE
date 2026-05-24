import React from 'react'
import * as Yup from 'yup';

export const validateLogin = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export const validateRegister = Yup.object({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    phone: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(10)
        .required('A phone number is required'),
    profilePic: Yup.mixed()
    // .required("A profile picture is required")
    // .test(
    //     "fileSize",
    //     "File too large. Max size is 2MB",
    //     (value) => !value || (value && value.size <= FILE_SIZE)
    // )
    // .test(
    //     "fileFormat",
    //     "Unsupported Format. Please use JPG, JPEG, GIF, or PNG",
    //     (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    // ),
});