<template>

    <header>
        <div class="logo">
            <a title="Groupomania_logo"><img src="../assets/Groupomania_Logos+(3)/icon-left-font-monochrome-white.svg" class="logo__img" alt="Logo Groupomania" title="Groupomnania" /></a>

           <div class="home_icon">
                <router-link to="/home"><font-awesome-icon icon="fa-solid fa-house" class="fa-user"/></router-link>
            </div>
        
        
        </div>  
       
        <nav>
            <div class="nav">
                <router-link to="/">
                    <div @click="logout" class="nav__button">
                        <p>Logout</p>
                    </div>
                </router-link>
            </div>
            <div class="nav">
                <router-link :to="{ name: 'profile', params: { user_id: userId }}">

                    <div class="nav__button">
                        <p>Profile</p>
                    </div>
                </router-link>
            </div>
        </nav>
    
    </header>

</template>

<script>
export default {
  name: 'HeaderPages',
  data () {
    return {
        userId:""
    }
  },
  methods :{
    logout : function () {
        localStorage.clear();
        this.$router.replace('accueil');
    },

    getUserId : function () {
        this.userId = localStorage.getItem('user_id');
    }
  },
  beforeMount : function () {
    this.getUserId();
  }
}
</script>


<style scoped lang="scss">
header
{
    width: 100%;
    height : 100px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    position:fixed;
    top :0;
    z-index: 1;

    background-color: #0968EC;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.16) ;

    & .logo
    {   
        margin : 0;
        width: auto;
        height: auto;
        padding: 20px 0px 0px 0px;
    
        display: flex;
        justify-content: space-between;
        text-align: center;

        &__img{
            height: auto;
            width: auto;
            margin: auto;
            display: inline-block;
        }

        & img
        {
            width: 70%;
            height : 70%;
            object-fit: contain;
        }

        & .home_icon {
            height : auto;
            width : auto;
            margin: auto;
            display: flex;
            color : white;
            font-size:50px;

            & .fa-user {
                color : white;

                &:hover{
                    transform: scale(1.1);
                }
            }
        }
    }

    & nav {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        margin : 0;
        height : auto;

        & .nav {
            text-align: center;
            min-width: 150px;

            &__button {
                width: 100%;
                height: 100%;
                border-top: 3px solid #0968EC;

                & p {
                    margin-top: 25%;
                    color : white;
                    font-weight: 800;
                }

                &:hover
                {
                    color : #0968EC;
                    border-top: 3px solid white;
                    & p{
                        font-weight: 900;
                    }
                }
            }

            &__buttonselected {
                width: 100%;
                height: 100%;
                color : #0968EC;
                border-top: 3px solid white;
                & p{
                    margin-top: 25%;
                    color : white;
                    font-weight: 900;
                }
            }

            & a
            {
                text-decoration: none;
                color: black;
            }
        }
    }

}
@media (max-width: 768px)
{
header {
    width : 100%;
    height : 100px;

    &  .logo {
        flex-direction :row-reverse;
        & img
        {
            visibility : hidden;
        }
        & .home_icon {
            font-size:40px;
            padding : 10px;
            & .fa-user {
                font-size:40px; 
            }
        }
    }

    & nav {
        width : auto;
        padding : 0;
        & .nav {
            width : auto;
            min-width: 50px;

            &__button {
                width : auto;
                display : flex;
                align-items: flex-end;
                & p {
                    margin : 0;
                    width : auto;
                    padding : 10px;
                }
            }
        }
    }
}
}
</style>