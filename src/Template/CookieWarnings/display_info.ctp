<?= $this->Html->css('CookieWarning.cookie_style'); ?>
<script>
    function closeIframe() {
        var iframe = document.getElementById('cookie_iframe');
        iframe.parentNode.removeChild(iframe);
    }
</script>
<div class="block">
    <p class="clearfix" style="text-align: justify">
        <span><b><?= __d('cookie_warning', 'Utilisation des cookies') ?></b></span>
        <?= __d('cookie_warning', "En poursuivant votre navigation sans modifier vos paramètres, vous acceptez l'utilisation des cookies ou
        technologies similaires pour disposer de services et d'offres adaptés à vos centres d'intérêts ainsi que pour la
        sécurisation des transactions sur notre site. Pour plus d’informations, gérer ou modifier les
        paramètres,&nbsp;") ?><?= $this->Html->link(__d('cookie_warning', 'cliquez ici'), ['action' => 'displayDetail'], ['target' => '_blank']) ?>
        <a class="btn-cookie" id="cookieBtn" style="float:right"
           href="javascript: window.parent.document.getElementById('cookie_iframe').parentNode.removeChild(window.parent.document.getElementById('cookie_iframe'))"><?= __d('cookie_warning', 'Fermer cette fenêtre') ?></a>
    </p>
</div>
