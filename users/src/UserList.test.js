import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserList from './UserList';

function renderComponent() {
    const users = [
        { name: 'jane', email:'jane@jane.com'},
        { name: 'sam', email:'sam@sam.com'}
    ];
    render(<UserList users={users} />);

    return {
        users,
    };
}

test('render one row per user', () => {
    // render the component
    renderComponent();
    // Option 1
    // render(<UserList users={users} />);
    // Option 2
    // const { container } = render(<UserList users={users} />);

    // find all the row in the table
    // screen.logTestingPlaygroundURL();
    // Option 1
    const rows = within(screen.getByTestId('users')).getAllByRole('row')
    // Option 2
    // eslint-disable-next-line
    // const rows = container.querySelectorAll('tbody tr');

    // Assertion: correct number of rows in the table

    expect(rows).toHaveLength(2);
});

test('render the email and name of each user', () => {
    const { users } = renderComponent();

    render(<UserList users={users} />);

    for (let user of users) {
        const name = screen.getByRole('cell', { name: user.name });
        const email = screen.getByRole('cell', { name: user.email})
        
        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    }
});