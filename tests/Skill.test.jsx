import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Skill from '../src/Skill';

describe('Skill', () => {
  it('renders correctly with initial props', () => {
    render(<Skill skill={1} originalSkill={""} initialSkillInputDone={false} setSkill={vi.fn()} setOriginalSkill={vi.fn()} setInitialSkillInputDone={vi.fn()} />);
    
    expect(screen.getByLabelText(/Skill:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '>' })).toBeInTheDocument();
  });

  it('renders correctly with initial props', () => {
    render(<Skill skill={1} originalSkill={5} initialSkillInputDone={true} setSkill={vi.fn()} setOriginalSkill={vi.fn()} setInitialSkillInputDone={vi.fn()} />);
    
    expect(screen.getByText('Skill')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  it('increments and decrements skill value', async () => {
    const setSkill = vi.fn();
    
    render(<Skill skill={1} originalSkill={4} initialSkillInputDone={true} setSkill={setSkill} setOriginalSkill={vi.fn()} setInitialSkillInputDone={vi.fn()} />);
    
    await userEvent.click(screen.getByRole('button', { name: '-' }));
    expect(setSkill).toHaveBeenCalledWith(0);
    
    await userEvent.click(screen.getByRole('button', { name: '+' }));
    expect(setSkill).toHaveBeenCalledWith(2); // This assumes the component updates the skill state correctly
  });

  // Add more tests as needed to cover other interactions and edge cases
});
