# <b>FormAI</b>

## Live URL: https://form-ai-rosy.vercel.app/
### Test Signin Credentials:
 - username: test
 - test@123
### Demo Video: https://www.loom.com/share/8883609e648e47158b61e5ce44612409?sid=0a8d11dd-6caa-4dcc-a182-a03ce94ac3fa  

### High-Level-Architechture
![Untitled-2024-12-17-0026](https://github.com/user-attachments/assets/678160fe-7f5b-4f10-a53b-a52cc5a7a233)

## 🚀 Features

- PDF file upload and storage
- Automated text extraction from PDFs
- AI-powered text analysis using Gemini 1.5 Flash
- Secure authentication system
- RESTful API architecture

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **AI Model**: Google Generative AI (Gemini 1.5 Flash)
- **Database ORM**: Prisma
- **Storage**: Supabase Bucket
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **File Processing**: pdf-parse, multer

## 🏗️ Architecture

The application is built using a microservices-style architecture with three main services:

### 1. Upload Service
- Handles PDF file uploads through multer's memory storage
- Securely stores files in Supabase bucket
- Returns public URL and file metadata
- Implements robust error handling and validation

### 2. Parsing Service
- Receives PDF public URL from Upload Service
- Extracts text content from PDF documents
- Utilizes pdf-parse for reliable text extraction
- Processes documents maintaining original formatting

### 3. NLP Service
- Processes extracted text using Gemini AI
- Generates dynamic labels and values based on document content
- Provides intelligent text analysis and classification
- Optimized for accuracy and performance

## 🔐 Authentication

The service implements secure authentication using JWT:
- Required for protected routes
- Token-based authorization using Bearer scheme
- Middleware protection for sensitive endpoints

## 📡 API Endpoints

```
Base URL: /api/v1
```

| Endpoint | Method | Authentication | Description |
|----------|---------|----------------|-------------|
| `/` | GET | No | Home route |
| `/signup` | POST | Yes | User registration |
| `/signin` | POST | Yes | User authentication |
| `/upload` | POST | Yes | PDF upload endpoint |
| `/nlp/:dataId` | GET | Yes | AI analysis endpoint |

## 🚀 Deployment
The service is deployed on Render

## 🔒 Security Considerations

- All routes handling sensitive operations are protected with JWT authentication
- File uploads are validated and sanitized
- Secure storage implementation using Supabase
- Input validation using Zod schemas
