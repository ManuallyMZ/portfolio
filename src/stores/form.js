// store/formStore.js
import { defineStore } from 'pinia';

export const useFormStore = defineStore('form', {
  state: () => ({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '',
    subject: '',
    reason: '',
    message: '',
    preferredContact: '',
    attachment: null,
    meetingDate: '',
    budget: ''
  }),
  actions: {
    setPersonalInfo(fullName, email, phone, countryCode) {
      this.fullName = fullName;
      this.email = email;
      this.phone = phone;
      this.countryCode = countryCode;
    },
    setInquiryDetails(subject, reason, message) {
      this.subject = subject;
      this.reason = reason;
      this.message = message;
    },
    setAdditionalInfo(preferredContact, attachment, meetingDate, budget) {
      this.preferredContact = preferredContact;
      this.attachment = attachment;
      this.meetingDate = meetingDate;
      this.budget = budget;
    },
    resetForm() {
      this.fullName = '',
      this.email = '',
      this.phone = '',
      this.countryCode = '',
      this.subject = '',
      this.reason = '',
      this.message = '',
      this.preferredContact = '',
      this.attachment = null,
      this.meetingDate = '',
      this.budget = 0
    }
  }
});
