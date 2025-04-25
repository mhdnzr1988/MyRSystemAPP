import { Story } from './story';

describe('Story', () => {
  it('should create an instance', () => {
    const story: Story = { title: 'Test', url: 'https://Something.com',id:12234333 };
    expect(story).toBeTruthy();
  });
});
