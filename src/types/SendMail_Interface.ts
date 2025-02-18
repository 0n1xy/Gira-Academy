export interface ISendEmail {
    to: string;
    subject: string;
    text: string;
    html?: string;
}
export interface ISendMultipleEmail{
    to: string[];
    subject: string;
    text: string;
    html?: string;
}