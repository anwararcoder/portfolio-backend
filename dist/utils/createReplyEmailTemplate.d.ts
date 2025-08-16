interface ContactData {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone?: string;
    company?: string;
    website?: string;
}
export declare const createReplyEmailTemplate: (contact: ContactData, reply: string) => string;
export {};
//# sourceMappingURL=createReplyEmailTemplate.d.ts.map