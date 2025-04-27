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
	fmt.Println("\nNow More Names!")

	names := randomNames()
	messages, err := greetings.Hellos(names)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(messages)
}

func randomName() string {
	names := []string{
		"William",
		"James",
		"Paola",
		"",
	}
	return names[rand.Intn(len(names))]
}

func randomNames() []string {
	names := []string{
		"Howard",
		"Jerry",
		"George",
		func() string {
			if rand.Intn(10) < 5 {
				return ""
			}
			return "George"
		}(),
	}
	return names[:rand.Intn(len(names))]
}
