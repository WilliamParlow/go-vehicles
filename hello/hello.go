package main

import (
	"fmt"

	"example.com/greetings"
)

func main() {
	message := greetings.Hello("William")
	fmt.Println(message)
}
