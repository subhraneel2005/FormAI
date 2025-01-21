import pdf from 'pdf-parse';

export async function extractTextFromPdf(buffer:Buffer) {
    try {
        const data = await pdf(buffer);
        return data.text;
    } catch (error) {
        console.log('Pdf parsing error:', error);
    }

}