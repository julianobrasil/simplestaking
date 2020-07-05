describe('Table stats application', () => {
  it('should open without any data', () => {
    cy.visit('');

    cy.contains('No data to show!').should('not.be.undefined');
  });

  it('should load some data after the user types in a valid token', () => {
    cy.visit('');

    cy.get('input').should('have.length', 1);

    cy.server();

    cy.fixture('operations.json').as('operations');
    cy.route('GET', '*', '@operations').as('getOperations');

    cy.get('input').type('tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo');

    cy.wait('@getOperations')
      .its('responseBody')
      .its('length')
      .should('be', 40);
  });

  it('should have only 10 elements visible', () => {
    cy.visit('');

    cy.get('input').should('have.length', 1);

    cy.server();

    cy.fixture('operations.json').as('operations');
    cy.route('GET', '*', '@operations').as('getOperations');

    cy.get('input').type('tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo');

    cy.wait('@getOperations')
      .get('cdk-virtual-scroll-viewport')
      .find('div.row')
      .its('length')
      .should('be', 10);

    cy.get('cdk-virtual-scroll-viewport').scrollTo('bottom');
  });

  it('should call the server again when scroll the virtual scrolling to the bottom', () => {
    cy.visit('');

    cy.server();

    cy.fixture('operations.json').as('operations');
    cy.fixture('two-operations.json').as('operations2');
    cy.route('GET', '*', '@operations').as('getOperations');

    cy.get('input').type('tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo');

    cy.wait('@getOperations').wait(2000);

    cy.route('GET', '*', '@operations2').as('getOperations2');
    cy.get('cdk-virtual-scroll-viewport').scrollTo('bottom');

    cy.wait('@getOperations2')
      .its('responseBody')
      .its('length')
      .should('be', 2);
  });
});
