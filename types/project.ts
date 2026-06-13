export interface Project {
    id: string;
    title: string;
    description: string;
    category: "Web App" | "Cybersecurity" | "Automation";
    techStack: string[];
    metrics?: string; // Misal: "98% Secure", "Zero Buffer Overflow"
    githubUrl?: string;
    liveUrl?: string;
}