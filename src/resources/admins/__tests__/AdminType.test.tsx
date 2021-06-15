import React from "react"
import {render} from '@testing-library/react';
import {Form} from 'react-final-form';

import {AdminType, onSelectChoice} from "../AdminType"

describe("onSelectChoice", () => {
  const form = {
    change: jest.fn()
  }
  it("sets the form data to the right values", () => {
    onSelectChoice('isAdmin', form);
    expect(form.change).toHaveBeenCalledWith('isAdmin', true)
  })
})

test('renders learn react link', () => {
  const FormComponent = () => (
    <Form onSubmit={() => {}}>
      {() => <AdminType />}
    </Form>
  )
  const { getByText } = render(<FormComponent />);
  expect(getByText(/Admin Type/i)).toBeInTheDocument()
});