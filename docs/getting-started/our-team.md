# Our team

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/koddr.png',
    name: 'Vic Shóstak',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/koddr' }
    ]
  }
]
</script>

Say hello to our awesome team.

<VPTeamMembers size="small" :members="members" />