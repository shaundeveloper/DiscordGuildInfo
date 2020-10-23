<template>
  <div class="index">

	<form class="w-full max-w-sm mx-auto mt-64">
		<transition name="fade">
			<div v-if="error" class="mb-4 text-sm max-w-lg bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded relative" role="alert">
  				<strong class="font-bold">Oops!</strong>
  				<span class="ml-2 block sm:inline">You entered a wrong server ID, try another one.</span>
  				<span class="absolute top-0 bottom-0 right-0 px-2 py-1">
    				<svg @click.prevent="error = false" class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  				</span>
		 	</div>
        </transition>
        <transition name="translate">
  			<div class="flex items-center border-b border-b-2 border-teal-500 py-2">
    			<input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Discord Guild Id" ref="guildIdInput">

    			<button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button" @click.prevent="guildInfo()">
      				Get infos!
    			</button>
  			</div>
  		</transition>
	</form>
	<transition name="fade">
	      <div v-if="!error && guildName>
  		<h1 class="w-full max-w-sm mx-auto mt-1">Name: {{ guildName }}</h1>
  		<h1 class="w-full max-w-sm mx-auto mt-1">Members online: {{ membersOnline }}</h1>
	      </div>
  	</transition>

  </div>
</template>

<style scoped>
	.fade-enter-active, .fade-leave-active { 
		transition: opacity 1s; 
	}
	.fade-enter, .fade-leave-to { 
		opacity: 0;
	}
</style>

<script>
	import axios from 'axios';

	export default {
  		name: 'Home',
  		methods: {
  		async guildInfo() {
		
  		const input = this.$refs.guildIdInput.value;

                if (/^[0-9]+$/.test(input)) {

                	this.error = false;

                    	try {
  				const data = (await axios.get(`https://discordapp.com/api/guilds/${this.$refs.guildIdInput.value}/widget.json`)).data
                   		this.guildName = data.name;
  				this.membersOnline = data.members.length;

  				} catch(e) {
  			   		this.error = true;
  				}

  			} else {
  				this.error = true;
  			}
  		}
  		},
  		data() {
  			return {
  				error: false,
  				membersOnline: "",
  				guildId: "",
  				guildName: ""
  			}
  		}
	}
</script>
