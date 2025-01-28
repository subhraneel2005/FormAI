import * as pdfjsLib from 'pdfjs-dist';

export async function extractTextFromPdf(buffer: Buffer) {
    try {

        const uint8Array = new Uint8Array(buffer);

        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
        const pdfDocument = await loadingTask.promise;
        
        let fullText = '';

        // Iterate through each page
        for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
            const page = await pdfDocument.getPage(pageNum);
            
            // Extract text content
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');
            
            // Extract annotations (including links)
            const annotations = await page.getAnnotations();
            const links = annotations
                .filter(annotation => annotation.subtype === 'Link' && annotation.url);
            
            // Add links to the text with labels
            let textWithLinks = pageText;
            links.forEach(link => {
                const linkText = link.title || 'Link';
                textWithLinks = textWithLinks.replace(
                    linkText,
                    `${linkText} [URL: ${link.url}]`
                );
            });
            
            fullText += textWithLinks + '\n';
        }

        return fullText.trim();
    } catch (error) {
        console.log('PDF parsing error:', error);
        throw error;
    }
}