const feedbackFormEl = document.querySelector('.feedback-form');
let formData = {
  email: '',
  message: '',
};

const fillFormFields = () => {
  try {
    const formDataFromLS = localStorage.getItem('feedback-form-data');
    if (!formDataFromLS) {
      return;
    }
    formData = JSON.parse(formDataFromLS);
    for (const key in formData) {
      if (feedbackFormEl.elements[key]) {
        feedbackFormEl.elements[key].value = formData[key];
      }
    }
  } catch (err) {
    console.log(err);
  }
};
fillFormFields();

const onFormFieldInput = event => {
  const { target: formFieldEl } = event;
  const fieldValue = formFieldEl.value;
  const fieldName = formFieldEl.name;
  formData[fieldName] = fieldValue;
  localStorage.setItem('feedback-form-data', JSON.stringify(formData));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();
  const { currentTarget: formEl } = event;
  formEl.reset();
  localStorage.removeItem('feedback-form-data');
  formData = { email: '', message: '' };
};

feedbackFormEl.addEventListener('input', onFormFieldInput);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
