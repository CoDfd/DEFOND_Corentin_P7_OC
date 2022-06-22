<template>
    <div class="button">
        <p>{{ name }}</p>
    </div>
</template>

<script>
export default {
  name: 'ButtonRename',
  props: {
    name : String
  }
}
</script>

<style scoped lang="scss">


.button
    {
        height: 50px;
        width: 220px;
        font-size: 110%;
        font-weight: 600;
        background-color: lighten(#0968EC,0%);
        color: white;

        display: flex;
        align-items: center;
        justify-content: center;

        border-top-left-radius: 12% 50%;
        border-bottom-left-radius: 12% 50%;
        border-top-right-radius: 12% 50%;
        border-bottom-right-radius: 12% 50%;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.20),
                    inset 2px 10px 20px rgba(255,255,255,0.5),
                    inset -2px -3px 20px rgba(0,0,0,0.2); 

        &:hover
        {
            box-shadow: 0px 5px 10px rgba(0,0,0,0.30),
                        inset 2px 10px 20px rgba(255,255,255,0.65),
                        inset -2px -3px 20px rgba(0,0,0,0.35); 
        }
    }

</style>