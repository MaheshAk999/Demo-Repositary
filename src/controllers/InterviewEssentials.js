const {InterviewEssentialsTechnical,GietMedhaAndMaitri}=require('../models/InterviewEssentials')
exports.PostQuestions=(req,res)=>{
    const Data=[
        {
          question: "Tell me about yourself.",
          answer: "Start with a brief introduction of your background, highlighting your education, professional experience, and key skills. Then, connect your experience to why you're interested in this role and how you can contribute.",
          type: "HR QUESTIONS",
          code: "I have a background in software engineering with a focus on backend development. I've worked for five years in various tech firms, specializing in building scalable systems. I'm excited about this role at your company because it aligns with my passion for innovative solutions and offers opportunities to lead impactful projects."
        },
        {
          question: "Why do you want to work here?",
          answer: "Demonstrate your knowledge of the company and its values. Connect your skills and career goals with how they align with the company's mission and culture.",
          type: "HR QUESTIONS",
          code: "I admire your company's commitment to sustainability and innovation, which are values I share deeply. Your recent projects in renewable energy solutions are particularly inspiring, and I believe my skills in project management can contribute significantly to your future initiatives."
        },
        {
          question: "What are your strengths and weaknesses?",
          answer: "Highlight strengths that are relevant to the job and show self-awareness about areas for improvement. Frame weaknesses as opportunities for growth and how you manage or overcome them.",
          type: "HR QUESTIONS",
          code: "One of my strengths is my ability to adapt quickly to new technologies, which has allowed me to excel in dynamic environments. As for weaknesses, I sometimes focus too much on details, but I've learned to balance this by prioritizing tasks effectively and seeking feedback from peers."
        },
        {
          question: "Can you describe a challenging situation at work and how you handled it?",
          answer: "Use the STAR method (Situation, Task, Action, Result) to structure your answer. Highlight problem-solving skills, resilience, and teamwork.",
          type: "HR QUESTIONS",
          code: "In my previous role, we faced a critical deadline for a project with constantly changing requirements. I took the lead in organizing daily stand-ups to keep the team aligned and focused. By delegating tasks according to team strengths and maintaining open communication, we not only met the deadline but also exceeded client expectations."
        },
        {
          question: "How do you handle stress and pressure?",
          answer: "Discuss strategies such as prioritization, time management, and maintaining a positive attitude. Provide examples of how you've successfully managed stressful situations in the past.",
          type: "HR QUESTIONS",
          code: "I thrive under pressure by setting clear priorities and breaking down tasks into manageable steps. For instance, during a high-stakes project, I maintained regular check-ins with my team, which helped us stay on track and address challenges proactively. Taking short breaks to recharge also helps me maintain focus and productivity."
        },
        {
          question: "Where do you see yourself in five years?",
          answer: "Show ambition and alignment with career growth opportunities at the company. Discuss how you plan to develop professionally and contribute to the organization's goals.",
          type: "HR QUESTIONS",
          code: "In five years, I see myself as a senior software engineer, leading a team in developing cutting-edge solutions. I'm eager to expand my expertise in machine learning and AI, which aligns with your company's vision for innovation. I'm committed to continuous learning and contributing to projects that drive meaningful impact."
        },
        {
          question: "How do you handle conflicts in a team?",
          answer: "Demonstrate conflict resolution skills, empathy, and the ability to collaborate effectively. Use examples of how you've resolved conflicts to achieve positive outcomes.",
          type: "HR QUESTIONS",
          code: "I believe open communication is key to resolving conflicts. In a recent project, I mediated a disagreement between team members by encouraging a constructive dialogue and finding common ground. By actively listening to each person's perspective and focusing on shared goals, we reached a consensus and improved team morale."
        },
        {
          question: "Why did you leave your last job?",
          answer: "Be honest and positive. Focus on career growth, seeking new challenges, or aligning with company values.",
          type: "HR QUESTIONS",
          code: "I left my previous role to pursue opportunities that allow me to apply my skills in a more innovative environment. Your company's reputation for fostering creativity and offering professional development aligns perfectly with my career goals. I'm excited about the possibility of contributing to your team."
        },
        {
          question: "What motivates you?",
          answer: "Discuss intrinsic and extrinsic motivators related to the job, such as challenges, learning opportunities, and recognition.",
          type: "HR QUESTIONS",
          code: "I'm motivated by solving complex problems and delivering solutions that make a positive impact. I thrive in environments that encourage creativity and offer opportunities for continuous learning. Recognition for my contributions and collaborating with passionate team members also drive my motivation to excel."
        },
        {
          question: "Do you have any questions for us?",
          answer: "Ask insightful questions about the company culture, team dynamics, growth opportunities, or specific projects. Show genuine interest in the role and organization.",
          type: "HR QUESTIONS",
          code: "Could you tell me more about the team's approach to innovation and how new ideas are encouraged and implemented? Also, I'm curious about the company's plans for expansion into international markets and how this role might contribute to those efforts."
        }
      ]
      
    InterviewEssentialsTechnical.updateOne({question: "Tell me about yourself."},{code:"Thank you for this opportunity to introduce myself.My name is Ganesh Pache. I am from Sambhajinagar, Maharashtra. I completed my Computer Science and Engineering degree from Sinhgad Institute of Technology, Lonavala.Computer science is omnipresent and present in every field, so I wasted these last 4 years developing my software skills.My technical skills include programming in Java, C, C++, HTML, CSS, databases, and Spring Boot. I have used these skills to build several projects, including a library management system and a messaging chatbot.Moving on to my extracurricular activities, I love to play cricket, especially as a batsman. I also enjoy riding bikes, exploring new cities, and seeking adventures.I led the event management team for the Career Counseling Club during my college days.I consider myself a very focused person, and I work towards my goals.Thank you so much."})
    .then(user => res.json(user))
    .catch(err => res.status(404).send(err.message));
}
exports.GetQuestions=(req,res)=>{
    const {Type}=req.params
    InterviewEssentialsTechnical.find({type:Type}).then(user => res.json(user))
    .catch(err => res.status(404).send(err.message));
}
exports.Intro=(req,res)=>{
  InterviewEssentialsTechnical.find({}).then(user=>res.json(user)).catch(err=>res.json(err))
}
exports.Admin=(req,res)=>{
  GietMedhaAndMaitri.find({}).then(data=>res.json(data)).catch(err=>res.json("Error in fetching"))
}
exports.AdminPost=(req,res)=>{
  const Data=new GietMedhaAndMaitri({
    "TeamLeadName": "John Doe",
    "TeamLeadPinno": "TL12345",
    "College": "Giet College",
    "Branch": "Computer Science",
    "Year": 3,
    "TeamMembersandPinno": {
        "Alice Smith": "TM001",
        "Bob Johnson": "TM002",
        "Charlie Brown": "TM003"
    },
    "RegisterEvents": "Hackathon"
})
  Data.save(
).then(data=>res.json(data)).catch(err=>res.json('Error while inserting'))
}