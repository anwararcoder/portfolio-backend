interface ContactData {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string;
    company?: string;
    website?: string;
}
export declare const createContactEmailTemplate: (contact: ContactData) => string;
export {};
//# sourceMappingURL=createContactEmailTemplate.d.ts.map