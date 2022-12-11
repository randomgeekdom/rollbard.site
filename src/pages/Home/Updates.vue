<script setup lang="ts">
import UpdatesService from '../../services/UpdatesService';
import update from '../../types/update';

  const Updates: update[] = UpdatesService.Updates.sort((x,y) => x.Date > y. Date ? -1 : 1);
</script>

<template>
  <div>
    <h2 class="mr-auto text-lg font-medium">Welcome</h2>
    <div class="p-5 mt-5 intro-y box">
      Rollbard is a site dedicated to tabletop RPGs.  I personally made it to help me with resources to run my own games but hopefully it can do the same for you.
    </div>
  </div>

  <div v-for="update in Updates">
    <h2 class="mr-auto text-lg font-medium">{{ update.Title }} - {{ update.Date.toDateString() }}</h2>
    <div class="p-5 mt-5 intro-y box">{{ update.Text }}</div>
  </div>

</template>
