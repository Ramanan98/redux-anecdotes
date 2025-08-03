describe('Anecdotes', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('shows anecdotes', () => {
    cy.contains('If it hurts, do it more often')
  })
  it('can create new anecdote', () => {
    cy.get('input[name="anecdote"]').type('test anecdote')
    cy.contains('button', 'add').click()
    cy.contains('test anecdote')
  })
  it('can vote for an anecdote', () => {
    cy.contains('If it hurts, do it more often').parent().contains('vote').click()
  })
})
