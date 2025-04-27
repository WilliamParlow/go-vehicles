package greetings

import (
	"regexp"
	"testing"
)

func TestHelloName(t *testing.T) {
	name := "Paola"
	want := regexp.MustCompile(`\b` + name + `\b`)
	msg, err := Hello(name)
	if !want.MatchString(msg) || err != nil {
		t.Errorf("Hello(%q) = %q, %v, want match for %#v, nil", name, msg, err, want)
	}
}

func TestHelloEmpty(t *testing.T) {
	name := ""
	want := "empty name"
	msg, err := Hello(name)
	if msg != "" || err == nil || err.Error() != want {
		t.Errorf("Hello(%q) = %q, %v, want \"\", %q", name, msg, err, want)
	}
}

func TestHellos(t *testing.T) {
	names := []string{"Howard", "Jerry", "George"}
	want := map[string]*regexp.Regexp{
		"Howard": regexp.MustCompile(`\bHoward\b`),
		"Jerry":  regexp.MustCompile(`\bJerry\b`),
		"George": regexp.MustCompile(`\bGeorge\b`),
	}
	msg, err := Hellos(names)
	if err != nil {
		t.Fatalf("Hellos(%q) returned an error: %v", names, err)
	}
	for name, message := range msg {
		if !want[name].MatchString(message) {
			t.Errorf("Hellos(%q) = %q, want %q", name, message, want[name])
		}
	}
}

func TestHellosEmpty(t *testing.T) {
	names := []string{}
	msg, err := Hellos(names)
	if err != nil {
		t.Fatalf("Hellos(%q) returned an unexpected error: %v", names, err)
	}
	if len(msg) != 0 {
		t.Errorf("Hellos(%q) = %v, want an empty map", names, msg)
	}
}
