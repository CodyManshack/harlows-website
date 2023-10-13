<template>
  <q-page padding>
    <section>
      <div class="row justify-center items-center text-center">
        <div class="col-md-8 col-sm-12">
          <h2 class="poiret-one">The Team</h2>
          <p class="text-body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed placerat arcu, sit amet tincidunt massa. Phasellus volutpat at dui nec bibendum. Ut id quam nec purus vulputate sollicitudin. Aliquam at ultricies diam. Aenean ut arcu vitae mi scelerisque volutpat vitae at eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis non convallis elit. Integer pharetra erat massa. Proin eget odio dui. Nam odio dolor, imperdiet quis sapien eu, pulvinar gravida tortor. In hac habitasse platea dictumst. Nullam leo nulla, ultricies in lacinia eu, ornare viverra lacus. Donec eget nulla et enim vulputate cursus. </p>
        </div>
      </div>
      <div class="row justify-evenly q-mt-xl">
        <div class="col-md-2" v-for="member in teamMembers" :key="member.name">
          <team-member v-bind="member"></team-member>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import TeamMember from 'src/components/TeamMember.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About',
  components: { TeamMember },
  setup () {
    const teamMembers = [
      {
        name: 'Kalen Manshack',
        title: 'Owner'
      },
      {
        name: 'Cody Manshack',
        title: 'Co-Owner'
      },
      {
        name: 'Leah IdkHerLastName',
        title: 'Bartender'
      }
    ]
    return {
      teamMembers
    }
  }
})
</script>
