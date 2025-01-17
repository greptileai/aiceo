import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface TeamMember {
  name: string
  role: string
  bio: string
  avatarUrl: string
  children?: TeamMember[]
}

interface OrgChartProps {
  data: TeamMember
}

export function OrgChart({ data }: OrgChartProps) {
  return (
    <div className="flex flex-col items-center">
      <TeamMemberNode member={data} isRoot={true} />
      {data.children && data.children.length > 0 && (
        <div className="flex flex-wrap justify-center mt-4">
          {data.children.map((child, index) => (
            <div key={index} className="flex flex-col items-center mx-4">
              <div className="w-px h-8 bg-gray-300"></div>
              <TeamMemberNode member={child} />
              {child.children && child.children.length > 0 && (
                <div className="flex flex-wrap justify-center mt-4">
                  {child.children.map((grandchild, idx) => (
                    <div key={idx} className="flex flex-col items-center mx-4">
                      <div className="w-px h-8 bg-gray-300"></div>
                      <TeamMemberNode member={grandchild} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TeamMemberNode({ member, isRoot = false }: { member: TeamMember; isRoot?: boolean }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Card className={`w-48 ${isRoot ? 'border-primary' : ''}`}>
          <CardHeader className="flex flex-col items-center p-4">
            <Avatar className="w-16 h-16 mb-2">
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-center text-sm">
              {member.name}
              {isRoot && <span className="ml-1 text-primary">(AI)</span>}
            </CardTitle>
            <div className="text-center text-xs text-muted-foreground">{member.role}</div>
          </CardHeader>
        </Card>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h3 className="font-semibold mb-2">{member.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
        <p className="text-sm">{member.bio}</p>
      </PopoverContent>
    </Popover>
  )
}

