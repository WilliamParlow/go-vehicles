package main

import (
	"fmt"
	"log"
	"math/rand"

	"example.com/greetings"
)

func main() {
	log.SetPrefix("greetings: ")
	log.SetFlags(0)

	message, err := greetings.Hello(randomName())
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(message)
}

func randomName() string {
	names := []string{
		"William",
		"James",
		"",
	}
	return names[rand.Intn(len(names))]
}
