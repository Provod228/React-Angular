function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{borderTop: '2px solid #333', paddingTop: 10, marginTop: 20}}>
            <p>© {year} Моё приложение. Все права защищены.</p>
        </footer>
    );
}

export default Footer;