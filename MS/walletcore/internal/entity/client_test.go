package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCreateNewClient(t *testing.T) {
	client, err := NewClient("João", "j@j.com")
	assert.Nil(t, err)
	assert.NotNil(t, client)
	assert.Equal(t, "João", client.Name)
	assert.Equal(t, "j@j.com", client.Email)
}

func TestCreateNEwClientArgsAreInvalid(t *testing.T) {
	client, err := NewClient("", "")
	assert.NotNil(t, err)
	assert.Nil(t, client)
}

func TestUpdateClient(t *testing.T) {
	client, _ := NewClient("João", "j@j.com")
	err := client.Update("John Doe Update", "j@j.com")
	assert.Nil(t, err)
	assert.Equal(t, "John Doe Update", client.Name)
	assert.Equal(t, "j@j.com", client.Email)

}

func TestUpdateWithInvalidArgs(t *testing.T) {
	client, _ := NewClient("João", "j@j.com")
	err := client.Update("", "j@j.com")
	assert.Error(t, err, "name is required")

}

func TestAddAccountToClient(t *testing.T) {
	client, _ := NewClient("João", "j@j.com")
	account := NewAccount(client)
	err := client.AddAccount(account)
	assert.Nil(t, err)
	assert.Equal(t, 1, len(client.Accounts))
}
