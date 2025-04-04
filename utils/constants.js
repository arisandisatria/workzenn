import moment from "moment";

export const PROMPT = (jobPosition, jobDesc, jobExp) => {
  return `Job position: ${jobPosition}, 
Job Description: ${jobDesc}, 
Years of Experience: ${jobExp}. 

Based on these details, generate exactly 8 interview questions with answers in **strict JSON format** as an array of objects. Each object must have:

{
  "question": "string",
  "answer": "string"
}

Return only the JSON output without any extra explanation.`;
};

export const COVER_LETTER_PROMPT = (info) => {
  return `
    [My Name: ${info.name}]
    [My Address: ${info.address}]
    [My Email: ${info.email}]
    [My Phone Number: ${info.phoneNumber}]
    [Current Date: ${moment().format("DD-MM-YYYY")}]
    [Job Position Applied: ${info.jobPosition}]
    [Job Experience: ${info.jobExperience}]
    [Job Information Source: ${info.jobInformationSource}]
    [Receiver Name: ${info.receiverName}]
    [Receiver Position: ${info.receiverPosition}]
    [Company Name: ${info.companyName}]
    [Company Address: ${info.companyAddress}]

    - Structure format:
      [Current Date]

      [My Name]
      [My Address]
      [My Email]
      [My Phone Number]

      [Hiring Manager’s Name]
      [Hiring Manager’s Position]
      [Company Name]
      [Company Address]

      Subject: Application for [Job Title] Position

      Dear [Hiring Manager’s Name / Hiring Team],

      [cover letter content]

      Sincerely,
      [Your Name]

    - First paragraph, clearly explain why you are writing, stating the position or type of job you are applying for. Start by stating the position you are applying for and how you learned about the opening. Use a concise statement that includes three reasons why you feel you are a good fit for the opportunity.
    - Second paragraph, explain why you are interested in the company and the job. Focus on skills or abilities that are relevant to the job.
    - Third paragraph, summarize all the important information about your suitability for the position in the closing paragraph. Reiterate your interest in joining the company and show your desire to proceed to the interview stage. Don't forget to express your gratitude to the recruiter for considering your application.
    - Base on those information, generate a professional and formal cover letter.
    - Please follow the structure format
    - Return only the text output without any extra explanation.
  `;
};
