import { defineStore } from 'pinia'
import axios from 'axios';

export const useRootStore = defineStore('root', {
  state: () => ({
    selectElements: [
      {
        titleElement: "Сделка",
        elementIndex: 0,
      },
      {
        titleElement: "Контакт",
        elementIndex: 1,
      },
      {
        titleElement: "Компания",
        elementIndex: 2,
      },
    ],
    btnDisable: true,
    titleElement: '',
    dataElements: [],
    isElementList: false,
    access_token: '',
    Id: '',
    tag: '',
    isLoading: false,
  }),
  getters: {

    getElements: (state) => state.selectElements,
    getElementsNames: (state) =>
      state.selectElements.map((el) => el.titleElement),
  },
  actions: {
    async getLeadsId() {
      const data = await axios.post(`https://rmxtfurm45mw01.amocrm.ru/api/v4/${this.tag}`, {
        params: {}
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.access_token}`,
        }
      }).then(data => this.Id = data.data._embedded.leads[0].id).then(data => this.getLeadsById(data))
    },
    async getLeadsById(id) {
      const data = await axios.get(`https://rmxtfurm45mw01.amocrm.ru/api/v4/${this.tag}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.access_token}`,

        }
      }).then(data => {
        this.isLoading = false
        this.dataElements.push({ id: data.data.id, name: data.data.name })
      })
    },
    async getContactsId() {
      const data = await axios.post(`https://rmxtfurm45mw01.amocrm.ru/api/v4/${this.tag}`, {
        params: { "name": "Контакт #" }
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.access_token}`,
        }
      }).then(data => this.Id = data.data._embedded.contacts[0].id).then(data => this.getDataById(data))
    },
    async getDataById(id) {
      const data = await axios.get(`https://rmxtfurm45mw01.amocrm.ru/api/v4/${this.tag}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.access_token}`,

        }
      }).then(data => {
        this.isLoading = false
        this.dataElements.push({ id: data.data.id, name: data.data.name + `${data.data.id}` })
      })
    },
    async getCompanyId() {
      const data = await axios.post(`https://rmxtfurm45mw01.amocrm.ru/api/v4/${this.tag}`, {
        params: { "name": "Компания #" }
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.access_token}`,
        }
      }).then(data => this.Id = data.data._embedded.companies[0].id).then(data => this.getDataById(data))
    },
    async getToken() {
      const data = await axios.get("https://test.gnzs.ru/oauth/get-token.php", {
        headers: {
          "Content-Type": "application/json",
          "X-Client-Id": "31550986"
        }
      }).then(data => this.access_token = data?.data?.access_token)
    }
  },

})