# Frontend Machine Coding Challenge: System Design Pattern

## 1. Requirements Analysis (5 minutes)

### Understand the Problem

- Read and analyze the requirements carefully
- Identify the core purpose of the component
- List all explicit and implicit requirements
- Note any constraints or limitations

### Key Questions to Ask

- What is the main functionality?
- What are the input/output expectations?
- Are there any edge cases to consider?
- What are the browser/device requirements?
- Are there any performance constraints?

## 2. Component Planning (5 minutes)

### Props Structure

```javascript
// Component props structure
const defaultProps = {
  // Default values for optional props
};

const propTypes = {
  // Required props
  // Optional props
  // Event handlers
  // Customization options
};
```

### State Management

- Identify local state needs
- Plan state structure
- Consider state updates
- Handle side effects

### Core Features Breakdown

1. Primary functionality
2. Secondary features
3. Edge cases
4. Error handling

## 3. Implementation Strategy (5 minutes)

### Phase 1: Basic Structure (15 minutes)

- Component skeleton
- Basic UI elements
- Core functionality
- Initial styling

### Phase 2: Core Features (15 minutes)

- Main interactions
- State management
- Event handling
- Basic validation

### Phase 3: Polish (10 minutes)

- Edge cases
- Error handling
- Accessibility
- Performance optimization
- Final styling

## 4. Testing Strategy

### Unit Tests

```javascript
describe("Component", () => {
  // Core functionality tests
  // Edge case tests
  // Error handling tests
  // Integration tests
});
```

### Manual Testing Checklist

- [ ] Core functionality
- [ ] Edge cases
- [ ] Error scenarios
- [ ] Responsive design
- [ ] Accessibility
- [ ] Performance

## 5. Code Structure

```
src/
  components/
    ComponentName/
      index.js           # Main component
      styles.css         # Component styles
      utils.js           # Helper functions
      constants.js       # Constants and configs
      __tests__/         # Test files
        Component.test.js
```

## 6. Performance Considerations

- Memoization using React.memo
- useCallback for event handlers
- useMemo for expensive computations
- Event debouncing/throttling
- Bundle size optimization

## 7. Accessibility Requirements

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Color contrast
- Focus management

## 8. Styling Guidelines

- CSS methodology (BEM)
- Responsive design
- Theme support
- Animation guidelines
- Browser compatibility

## 9. Common Pitfalls to Avoid

1. Over-engineering
2. Missing edge cases
3. Poor error handling
4. Accessibility oversights
5. Performance issues
6. Inconsistent styling

## 10. Time Management

- Total Time: 45 minutes
  - Planning: 15 minutes
  - Implementation: 25 minutes
  - Testing & Polish: 5 minutes

## 11. Evaluation Criteria

### 1. Functionality (40%)

- Core features working
- Edge cases handled
- Error handling
- User interactions

### 2. Code Quality (30%)

- Clean, readable code
- Proper component structure
- Efficient implementation
- Best practices

### 3. User Experience (20%)

- Smooth interactions
- Responsive design
- Accessibility
- Visual polish

### 4. Technical Excellence (10%)

- Performance
- Modern React patterns
- Testing coverage
- Documentation

## 12. Documentation Template

```javascript
/**
 * ComponentName
 *
 * @description
 * Brief description of the component
 *
 * @example
 * <ComponentName
 *   prop1={value1}
 *   prop2={value2}
 * />
 *
 * @props
 * - prop1: description
 * - prop2: description
 */
```

## 13. Final Checklist

### Before Submission

- [ ] All requirements met
- [ ] Edge cases handled
- [ ] Tests written
- [ ] Code documented
- [ ] Performance checked
- [ ] Accessibility verified
- [ ] Browser compatibility tested
- [ ] Code reviewed

### Common Gotchas

- [ ] Mobile responsiveness
- [ ] Keyboard navigation
- [ ] Error states
- [ ] Loading states
- [ ] Empty states
- [ ] Screen reader support

## 14. Bonus Features (If Time Permits)

- Advanced interactions
- Customization options
- Performance optimizations
- Additional accessibility features
- Enhanced user experience

## 15. Quick Reference

### React Best Practices

- Use functional components with hooks
- Implement PropTypes for type checking
- Follow React hooks guidelines
- Optimize re-renders with React.memo
- Handle side effects with useEffect

### CSS Best Practices

- Use BEM naming convention
- Implement responsive design
- Consider theme support
- Optimize animations
- Use CSS variables for theming

### Testing Best Practices

- Write meaningful tests
- Cover edge cases
- Test accessibility
- Performance testing
- Cross-browser testing

## 16. Component Template

```javascript
import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import "./styles.css";

const ComponentName = ({ prop1, prop2, onChange }) => {
  // State management
  const [state, setState] = useState(initialState);

  // Event handlers
  const handleChange = useCallback((event) => {
    // Handle change
  }, []);

  // Render
  return <div className="component">{/* Component content */}</div>;
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  onChange: PropTypes.func,
};

ComponentName.defaultProps = {
  prop2: 0,
  onChange: () => {},
};

export default ComponentName;
```
