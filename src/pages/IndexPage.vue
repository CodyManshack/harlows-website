<template>
  <q-page>
    <div class="row justify-center q-mt-xl">
      <div class="col-12 col-md-10">
        <template v-for="cocktail in cocktails" :key="cocktail.name">
          <CocktailCard :cocktail="cocktail"/>
        </template>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CocktailCard from 'src/components/CocktailCard.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { CocktailCard },
  setup () {
    const cocktails = [
      {
        name: 'Old Fashioned',
        description: 'The Old Fashioned is a classic cocktail that originated in the United States, but has become popular all over the world, including in Spain. It is a simple and elegant drink that has stood the test of time. The Old Fashioned is a rich and complex blend of flavors, with the sweetness of the sugar, the bitterness of the bitters, and the smoky, oaky flavor of the whiskey. The orange or cherry garnish adds a hint of citrus or sweetness, depending on your preference. It\'s a drink that is meant to be savored slowly, allowing you to appreciate the depth and complexity of the flavors.',
        image: 'src/assets/cocktails/old-fashioned.jpg',
        flavorProfile: [4, 0, 3, 5, 4, 0, 7, 5]
      },
      {
        name: 'Negroni',
        description: 'The Negroni is a classic cocktail that originated in Italy, but has become popular all over the world, including in Spain. It is a bittersweet and refreshing drink. The resulting drink is a vibrant and bold blend of flavors, with the botanical notes of the gin, the bitter and herbal flavors of the Campari, and the sweet and aromatic flavors of the vermouth. The orange garnish adds a hint of citrus, which balances the bitter and sweet flavors. It\'s a drink that is meant to be enjoyed slowly, allowing you to savor the complexity and balance of the flavors.',
        image: 'src/assets/cocktails/negroni-maybe.jpg',
        flavorProfile: [4, 5, 10, 0, 0, 10, 6, 5]
      },
      {
        name: 'Man O\' War',
        description: 'The Man O\' War is a powerful and flavorful cocktail that is named after a famous racehorse from 1920s America, who happens to be Seabiscuit\'s grandpa. is a bold and robust blend of flavors, with the rich and smoky notes of the bourbon, the sweet and fruity flavors of the orange curaçao, and the tart and tangy flavors of the lemon juice. The simple syrup adds a touch of sweetness, which balances the sourness of the lemon. The lemon garnish adds a refreshing citrus aroma, which complements the flavors of the drink.',
        image: 'src/assets/cocktails/man-o-war.jpg',
        flavorProfile: [6, 4, 2, 0, 0, 0, 7, 4]
      }
    ]
    return {
      cocktails
    }
  }
})
</script>

<style lang="scss" scoped>
.poiret-one {
  font-weight: 600;
}
.q-item__label{
  width: 100%;
}
</style>
