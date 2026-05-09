from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from pypdf import PdfReader

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini API Key
genai.configure(api_key="your api key ")

# Gemini model
model = genai.GenerativeModel("gemini-1.5-flash")


@app.get("/")
def home():
    return {"message": "AI Study Buddy Backend Running 🚀"}


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    # Read PDF
    reader = PdfReader(file.file)

    text = ""

    for page in reader.pages:
        extracted = page.extract_text()

        if extracted:
            text += extracted

    # AI Prompt
    prompt = f"""
    You are an AI tutor.

    Read these notes carefully.

    TASK:
    1. Create an easy summary
    2. Create 5 quiz questions with answers

    NOTES:
    {text}
    """

    # Generate AI response
    response = model.generate_content(prompt)

    return {
        "result": response.text
    }