import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import './DisplaySetting.scss';
import {
  Form,
  FormLayout,
  Labelled,
  Stack,
  TextStyle,
  Checkbox
} from '@shopify/polaris';
import RangeSliders from './RangeSlider';

const defaultOptions = [
  {label: 'Bottom left', value: 'bottom-left'},
  {label: 'Bottom right', value: 'bottom-right'},
  {label: 'Top left', value: 'top-left'},
  {label: 'Top right', value: 'top-right'}
];
const helpText = 'The display position of the popup on the website';

export default function DisplaySetting({
  input,
  handleChangeInput,
  options = defaultOptions
}) {
  const onChangeValue = val => {
    handleChangeInput('position', val);
  };

  const handleChangeHide = useCallback(
    newChecked => handleChangeInput('hideTimeAgo', newChecked),
    []
  );
  const handleChangeTruncate = useCallback(
    newChecked => handleChangeInput('truncateProductName', newChecked),
    []
  );

  const handleChangeDisplayDuration = useCallback(
    newChecked => handleChangeInput(`displayDuration`, newChecked),
    []
  );
  const handleChangeFirstDelay = useCallback(
    newChecked => handleChangeInput(`firstDelay`, newChecked),
    []
  );

  const handleChangePopsInterval = useCallback(
    newChecked => handleChangeInput(`popsInterval`, newChecked),
    []
  );

  const handleChangeMaxPopsDisplay = useCallback(
    newChecked => handleChangeInput(`maxPopsDisplay`, newChecked),
    []
  );

  return (
    <Form>
      <FormLayout>
        <TextStyle variation="strong">APPEARANCE</TextStyle>
        <Labelled label="Desktop Position">
          <Stack>
            {options.map((option, key) => (
              <div
                key={key}
                className={`Avada-DesktopPosition ${
                  input.position === option.value
                    ? 'Avada-DesktopPosition--selected'
                    : ''
                }`}
                onClick={() => onChangeValue(option.value)}
              >
                <div
                  className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option.value}`}
                ></div>
              </div>
            ))}
          </Stack>
          <TextStyle variation="subdued">{helpText}</TextStyle>
        </Labelled>
        <Checkbox
          label="Hide time ago"
          checked={input.hideTimeAgo}
          onChange={handleChangeHide}
        />
        <Checkbox
          label="Truncate content text"
          checked={input.truncateProductName}
          onChange={handleChangeTruncate}
          helpText="If your product name is long for one line, it will be truncated to 'Product name...' "
        />

        <TextStyle variation="strong">TIMING</TextStyle>
        <FormLayout.Group>
          <RangeSliders
            label="Display duration"
            helpText="How long each pop will display on your page"
            suffix="second(s)"
            input={input.displayDuration}
            handleRangeSliderChange={handleChangeDisplayDuration}
          />
          <RangeSliders
            label="Time before the first pop"
            helpText="The delay time before the first notification"
            suffix="second(s)"
            input={input.firstDelay}
            handleRangeSliderChange={handleChangeFirstDelay}
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <RangeSliders
            label="Gap time between the two pop"
            helpText="The time interval between the two pop notifications"
            suffix="second(s)"
            input={input.popsInterval}
            handleRangeSliderChange={handleChangePopsInterval}
          />
          <RangeSliders
            label="Maximum of popups"
            helpText="The maximum number of popups are allowed to show after page loading"
            suffix="pop(s)"
            input={input.maxPopsDisplay}
            handleRangeSliderChange={handleChangeMaxPopsDisplay}
          />
        </FormLayout.Group>
      </FormLayout>
    </Form>
  );
}

DisplaySetting.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string
};
