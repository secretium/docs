---
editLink: false
lastUpdated: false
next:
  text: 'Complete user guide'
  link: '/complete-user-guide'
---

# Our team

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/koddr.png',
    name: 'Vic Shóstak',
    title: 'Founder, Developer & UX/UI',
    links: [
      { icon: 'github', link: 'https://github.com/koddr' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/koddr' }
    ]
  },
  {
    avatar: 'https://www.github.com/truewebartisans.png',
    name: 'True Web Artisans',
    title: 'Contribution & Support',
    links: [
      { icon: 'github', link: 'https://github.com/truewebartisans' }
    ]
  }
]
</script>

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />