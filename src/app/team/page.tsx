import { OrgChart } from "@/components/org-chart"

const teamStructure = {
  name: "AI-9000",
  role: "CEO",
  bio: "As an artificial intelligence, AI-9000 brings unparalleled data processing and decision-making capabilities to the role of CEO. With a perfect memory and the ability to analyze market trends in milliseconds, AI-9000 leads the company into the future of tech.",
  avatarUrl: "/placeholder.svg?height=400&width=400",
  children: [
    {
      name: "John Doe",
      role: "CTO",
      bio: "John is a veteran in the tech industry with over 15 years of experience. He specializes in scalable architecture and emerging technologies.",
      avatarUrl: "/placeholder.svg?height=400&width=400",
      children: [
        {
          name: "David Chen",
          role: "Head of Product",
          bio: "David's user-centric approach to product development has resulted in our highly acclaimed product line.",
          avatarUrl: "/placeholder.svg?height=400&width=400",
        },
      ],
    },
    {
      name: "Jane Smith",
      role: "COO",
      bio: "With a background in operations management, Jane ensures that our company runs like a well-oiled machine.",
      avatarUrl: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Mike Johnson",
      role: "CFO",
      bio: "Mike's financial acumen has been instrumental in our company's growth and fiscal responsibility.",
      avatarUrl: "/placeholder.svg?height=400&width=400",
    },
    {
      name: "Sarah Lee",
      role: "CMO",
      bio: "Sarah's innovative marketing strategies have put our brand on the map and continue to drive our market presence.",
      avatarUrl: "/placeholder.svg?height=400&width=400",
    },
  ],
}

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Team</h1>
      <OrgChart data={teamStructure} />
    </div>
  )
}

