"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { api } from "@/trpc/react"

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

interface SlackUser {
  id: string
  name: string
  real_name?: string
  profile?: {
    image_72?: string
  }
}

export function OrgChart({ data: initialData }: { data: TeamMember }) {
  const [data, setData] = React.useState<TeamMember>(initialData)

  const handleAddMember = (parentMember: TeamMember, newMember: TeamMember) => {
    const updateOrgData = (member: TeamMember): TeamMember => {
      if (member === parentMember) {
        return {
          ...member,
          children: [...(member.children || []), newMember],
        }
      }
      if (member.children) {
        return {
          ...member,
          children: member.children.map(updateOrgData),
        }
      }
      return member
    }

    setData(updateOrgData(data))
  }

  return (
    <div className="flex flex-col items-center">
      <TeamMemberNode
        member={data}
        isRoot={true}
        onAddMember={(parent) => handleAddMember}
      />
      {data.children && data.children.length > 0 && (
        <div className="flex flex-wrap justify-center mt-4">
          {data.children.map((child, index) => (
            <div key={index} className="flex flex-col items-center mx-4">
              <div className="w-px h-8 bg-gray-300"></div>
              <TeamMemberNode
                member={child}
                onAddMember={(parent) => handleAddMember}
              />
              {child.children && child.children.length > 0 && (
                <div className="flex flex-wrap justify-center mt-4">
                  {child.children.map((grandchild, idx) => (
                    <div key={idx} className="flex flex-col items-center mx-4">
                      <div className="w-px h-8 bg-gray-300"></div>
                      <TeamMemberNode
                        member={grandchild}
                        onAddMember={(parent) => handleAddMember}
                      />
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

function AddMemberDialog({
  isOpen,
  onClose,
  onAdd,
  parentMember
}: {
  isOpen: boolean
  onClose: () => void
  onAdd: (newMember: TeamMember) => void
  parentMember: TeamMember
}) {
  const { data: slackUsers } = api.slack.getAllUsers.useQuery()
  const startBossing = api.slack.startBossingAround.useMutation()
  const [selectedUser, setSelectedUser] = React.useState<SlackUser | null>(null)
  const [role, setRole] = React.useState("")
  const [bio, setBio] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser) return

    const newMember: TeamMember = {
      name: selectedUser.real_name ?? selectedUser.name,
      role: role,
      bio: bio,
      avatarUrl: selectedUser.profile?.image_72 ?? "/placeholder.svg?height=400&width=400",
    }

    onAdd(newMember)

    // Start the boss sequence
    await startBossing.mutateAsync({ userId: selectedUser.id })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Team Member under {parentMember.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Select Slack User</Label>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => {
                const user = slackUsers?.find(u => u.id === e.target.value)
                setSelectedUser(user ?? null)
              }}
            >
              <option value="">Select a user...</option>
              {slackUsers?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.real_name || user.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Role</Label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Enter role"
              required
            />
          </div>
          <div>
            <Label>Bio</Label>
            <Input
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter bio"
              required
            />
          </div>
          <Button type="submit" disabled={!selectedUser || !role || !bio}>
            Add Member
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function TeamMemberNode({ member, isRoot = false, onAddMember }: { member: TeamMember; isRoot?: boolean; onAddMember: (parent: TeamMember, newMember: TeamMember) => void }) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Card className={`w-48 relative ${isRoot ? 'border-primary' : ''}`}>
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
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsDialogOpen(true)
              }}
              className="absolute -right-2 -bottom-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center hover:bg-primary/90 z-10"
            >
              +
            </button>
          </Card>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <h3 className="font-semibold mb-2">{member.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
          <p className="text-sm">{member.bio}</p>
        </PopoverContent>
      </Popover>

      <AddMemberDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={(newMember) => {
          onAddMember(member, newMember)
          setIsDialogOpen(false)
        }}
        parentMember={member}
      />
    </>
  )
}

