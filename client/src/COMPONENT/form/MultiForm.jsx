
import React, { useState } from "react"
import '../../STYLE/multiForm.css';

/**
 * MultiForm Wrapper Component
 * Manages the navigation logic for a multi-step process.
 * Dynamically handles any number of children as form steps.
 */
export const MultiForm = (props) => {
    // Converts children to an array to allow indexed access and mapping
    let children = React.Children.toArray(props.children)
    let steps = React.Children.count(props.children)

    const [currentStep, setCurrentStep] = useState(0)

    /**
     * Navigates to the next step if not at the end.
     */
    const next = () => {
        if (currentStep < steps - 1)
            setCurrentStep(currentStep + 1)
    }

    /**
     * Navigates to the previous step if not at the beginning.
     */
    const prev = () => {
        if (currentStep > 0)
            setCurrentStep(currentStep - 1)
    }

    return <>
        <div className="multiForm-page">
            <div className="form">
                {/* --- Step Indicator Navigation --- */}
                {children.map((x, i) => (
                    <button key={i} className="steps" onClick={() => setCurrentStep(i)}>
                        {i + 1}
                    </button>
                ))}
                <div className="multiForm">
                    {/* Render only the currently active step */}
                    {children[currentStep]}

                    {/* --- Navigation Buttons --- */}
                    <div className="buttons">
                        <button className="b" onClick={prev}>prev</button>
                        <button className="b" onClick={next}>next</button>
                    </div>
                </div>
            </div>
        </div>




    </>
}