import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { ProjectTypeSelection } from "./steps/project-type-selection"
import { ProjectLocationSize } from "./steps/project-location-size"
import { ProjectGoalsRequirements } from "./steps/project-goals-requirements"
import { BudgetTimeline } from "./steps/budget-timeline"
import { AdditionalDetails } from "./steps/additional-details"
import { ReviewSubmit } from "./steps/review-submit"
import { ContactDetails } from "./steps/contact-details"


const initialValues = {
  projectName: '',
  projectType: '',
  location: '',
  size: '',
  goals: '',
  requirements: '',
  budget: '',
  timeline: '',
  additionalDetails: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
};

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required('Project name is required'),
  projectType: Yup.string().required('Project type is required'),
  location: Yup.string().required('Location is required'),
  size: Yup.string().required('Size is required'),
  goals: Yup.string().required('Goals are required'),
  requirements: Yup.string().required('Requirements are required'),
  budget: Yup.string().required('Budget is required'),
  timeline: Yup.string().required('Timeline is required'),
  contactName: Yup.string().required('Contact name is required'),
  contactEmail: Yup.string().email('Invalid email').required('Email is required'),
  contactPhone: Yup.string().required('Phone number is required'),
});

const steps = [
  { component: <ProjectTypeSelection />, title: 'Project Type' },
  { component: <ProjectLocationSize />, title: 'Location & Size' },
  { component: <ProjectGoalsRequirements />, title: 'Goals & Requirements' },
  { component: <BudgetTimeline />, title: 'Budget & Timeline' },
  { component: <AdditionalDetails />, title: 'Additional Details' },
  { component: <ContactDetails />, title: 'Contact Details' },
  { component: <ReviewSubmit />, title: 'Review & Submit' },
];

const ProjectForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(0);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
      navigate('/success');
    },
  });

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {steps[currentStep].component}
      <div>
        <button type="button" onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </button>
        <button type="button" onClick={handleNext} disabled={currentStep === steps.length - 1}>
          Next
        </button>
        {currentStep === steps.length -1 && <button type="submit">Submit</button>}
      </div>
    </form>
  );
};

export default ProjectForm;

