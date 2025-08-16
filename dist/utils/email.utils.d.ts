interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}
export declare const sendEmail: (options: EmailOptions) => Promise<void>;
export declare const sendContactNotification: (contact: any) => Promise<void>;
export declare const sendContactReply: (contact: any, reply: string) => Promise<void>;
export declare const testEmailConnection: () => Promise<boolean>;
export {};
//# sourceMappingURL=email.utils.d.ts.map