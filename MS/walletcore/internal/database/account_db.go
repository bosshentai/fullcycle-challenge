package database

import (
	"database/sql"

	"github.com/bosshentai/fullcycle-challenge/MS/walletcore/internal/entity"
)

type AccountDB struct {
	DB *sql.DB
}

func NewAccountDB(db *sql.DB) *AccountDB {
	return &AccountDB{
		DB: db,
	}
}

func (a *AccountDB) FindByID(id string) (*entity.Account, error) {
	var account entity.Account
	var client entity.Client

	account.Client = &client

	stmt, err := a.DB.Prepare("SELECT a.id, a.client_id, a.balance, a.created_at, a.updated_at, c.id, c.name, c.email, c.created_at, c.updated_at FROM accounts a INNER JOIN clients c ON a.client_id = c.id WHERE a.id = ?")

	if err != nil {
		return nil, err
	}

	defer stmt.Close()

	row := stmt.QueryRow(id)

	err = row.Scan(
		&account.ID,
		&account.Client.ID,
		&account.Balance,
		&account.CreatedAt,
		&account.UpdatedAt,
		&client.ID,
		&client.Name,
		&client.Email,
		&client.CreatedAt,
		&client.UpdatedAt)

	if err != nil {
		return nil, err
	}
	return &account, nil
}

func (a *AccountDB) Save(account *entity.Account) error {
	stmt, err := a.DB.Prepare("INSERT INTO accounts (id, client_id, balance, created_at, updated_at) VALUES (?, ?, ?, ?, ?)")

	if err != nil {
		return err
	}

	defer stmt.Close()
	_, err = stmt.Exec(
		account.ID,
		account.Client.ID,
		account.Balance,
		account.CreatedAt,
		account.UpdatedAt)

	if err != nil {
		return err
	}

	return nil
}
